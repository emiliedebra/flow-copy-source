#!/usr/bin/env node
'use strict';

var flowCopy = require('..');

var argv = require('yargs')
  .usage('Usage: $0 [-v|--verbose] [-w|--watch] [-i PATTERN]... SRC... DEST')
  .boolean('verbose')
  .boolean('watch')
  .alias('v', 'verbose')
  .describe('v', 'Show changes')
  .alias('w', 'watch')
  .describe('w', 'Re-copy files on change')
  .alias('i', 'ignore')
  .describe('i', 'ignore pattern (glob expression)')
  .demandCommand(2)
  .strict()
  .argv;

var srcs = argv._.slice(0, -1);
var dest = argv._[argv._.length-1];

flowCopy(srcs, dest, {verbose: argv.verbose, ignore: argv.ignore, watch: argv.watch})
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
