const fs = require('fs');
const archiver = require('archiver');
const AWS = require('aws-sdk');
AWS.config.update({region: `${process.env.AWS_DEFAULT_REGION}`});
const filesize = require('filesize');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

const FILENAME = `alexa-chilitime-${pkg.version}.zip`;

const updateLambda = () => {
    console.log(`Updating lambda ${process.env.AWS_LAMBDA}`);
    const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
    const codeParams = {
        FunctionName: `${process.env.AWS_LAMBDA}`,
        Publish: true,
        S3Bucket: `${process.env.AWS_BUCKET}`,
        S3Key: `${FILENAME}`
    };
    lambda.updateFunctionCode(codeParams, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log('Lambda Deploy Success!', data);
        }
    });

};

const deployS3 = () => {
    // copy to S3
    const s3 = new AWS.S3();
    const fileStream = fs.createReadStream(`dist/${FILENAME}`);
    fileStream.on('error', err => {
        console.log('File Error', err);
    });

    console.log(`Deploying ${FILENAME} to S3...`);

    const uploadParams = {
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: `${FILENAME}`,
        Body: fileStream
    };

    s3.upload(uploadParams, (err, data) => {
        if (err) {
            console.log('S3 Upload Error', err);
        }

        if (data) {
            console.log('S3 Upload Success!', data);
            updateLambda();
        }
    });
};

const start = () => {
    mkdirp.sync('dist');

    const output = fs.createWriteStream(`dist/${FILENAME}`);
    const archive = archiver('zip');

    output.on('close', function () {
        console.log(`Zipped Size: ${filesize(archive.pointer())}`);
        deployS3();
    });

    archive.on('error', function(err){
        throw err;
    });

    archive.pipe(output);

    // Zip up the build/lambda directory
    archive.directory('build/lambda', false);
    archive.finalize();
};


start();
