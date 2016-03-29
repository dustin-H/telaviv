/*const exec = require('child_process').exec;
const child = exec('npm run dev', {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(error);
  }
});
const child2 = exec('npm run build-and-start', {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(error);
  }
});*/

var util  = require('util'),
    spawn = require('child_process').spawn,
    ls2    = spawn('npm', ['run', 'build-and-start']);

ls2.stdout.on('data', function (data) {
  console.log(''+data);
});

ls2.stderr.on('data', function (data) {
  console.log(''+data);
});

ls2.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});

var util  = require('util'),
    spawn = require('child_process').spawn,
    ls    = spawn('npm', ['run', 'dev']);

ls.stdout.on('data', function (data) {
  console.log(''+data);
});

ls.stderr.on('data', function (data) {
  console.log(''+data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});
