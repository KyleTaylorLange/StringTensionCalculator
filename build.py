import os
import subprocess
import shutil
from datetime import datetime

# Deletes old files from distribution directories.
def cleanFiles():
  print("Deleting old files.")
  paths_to_delete = [os.path.join("dist", "src"), os.path.join("dist", "json")]

  for rel_path in paths_to_delete:
    abs_path = os.path.join(os.getcwd(), rel_path)

    if (os.path.exists(abs_path)):
      try:
        shutil.rmtree(abs_path)
        print("  Deleted: " + rel_path)
      except:
        raise Exception("Unable to delete: " + rel_path)

# Runs the TypeScript compiler.
def runCompiler():
  # Run the TypeScript compiler
  ts_compiler_path = shutil.which("tsc")

  if type(ts_compiler_path) != str:
    raise Exception("Unable to find TypeScript compiler (TSC).")

  print("Running the TypeScript Compiler")
  process_results = subprocess.run([ts_compiler_path])

  if (process_results.returncode != 0):
    raise Exception("Error during compilation.")

  print("Compilation finished successfully.")

if __name__ == "__main__":
  print("Starting build script.")
  start_time = datetime.now().timestamp()

  try:
    cleanFiles()
    runCompiler()
    elapsed_time = datetime.now().timestamp() - start_time
    print("Build script completed successfully in " + format(elapsed_time, ".3f") + "s.")
  except Exception as ex:
    print("Build script failed: " + str(ex))
