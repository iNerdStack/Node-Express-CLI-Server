#!/usr/bin/python3

import sys, os

# TODO: Remove this hack since pip will install to standard paths
sys.path.insert(1, os.path.abspath("../../cli-modules"))
from native.exec import ExecEngine


def main():

    module_name = "crypto-cli"
    arguments = "md5 --text=\"Hello World\""

    ex = ExecEngine(module_name, arguments)
    if ex.executeCommand():
        print("md5 stdout: ", ex.output()[1])
        print("md5 stderr: ", ex.output()[2])
        print("md5 retcode: ", ex.output()[0])



if __name__ == '__main__':
    main()