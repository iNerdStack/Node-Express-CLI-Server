import sys
import os
import platform
import subprocess

# TODO: Remove this hack since pip will install to standard paths
cli_modules_path = os.path.abspath("../../cli-modules")


class ExecEngine:

	def __init__(self, module_name="", args=""):
		self.module_name = module_name
		self.args = args    # args are passed verbatim to module
		self.engine = None
		self.custom_path_env={"PATH":
			"".join(
				["".join(
					[cli_modules_path,"/",self.module_name]
				), ":", os.environ['PATH']]
			)}


	def executeCommand(self):
		"""
		Executes the command and returns the general status. Details are
		retrieved with `output()'
		"""
		status_tmp = False

		if platform.system() == 'Linux':
			try:
				self.engine = subprocess.run(
					"".join([self.module_name, " ", self.args]),
					shell=True,
					capture_output=True,
					text=True,

					# TODO: No need to define env since installing engine
					# with pip will mean we can find cli-modules relative
					# to standard path
					env=self.custom_path_env
				)
				status_tmp = True

			except subprocess.CalledProcessError as e:
				# some binaries print their errors on
			    # stdout. TODO: Enforce binaries printing
				# issues in stderr, never stdout.s
				pass

			except Exception as e:
				print(e)

		else:
			# TODO: Implement for Windows
			pass

		return status_tmp


	def output(self):
		"""
		Returns more info about the command. This is separated from executeCommand()
		for commands where you don't care about the output/stdout/stderr. Return value

		"""
		try:
			return self.engine.returncode, self.engine.stdout, self.engine.stderr
		except AttributeError as e:    # executeCommand() was never called
			print(e)
			return None, None, None