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
        print("  Unable to delete: " + rel_path)
        return False
  return True

# Runs the TypeScript compiler.
def runCompiler():
  # Run the TypeScript compiler
  ts_compiler_path = shutil.which("tsc")
  if type(ts_compiler_path) != str:
    print("Unable to find TypeScript compiler (TSC).")
    return False
  print("Running the TypeScript Compiler")
  process_results = subprocess.run([ts_compiler_path])
  if (process_results.returncode != 0):
    print("Error during compilation.")
    return False
  print("Compilation finished successfully.")
  return True

if __name__ == "__main__":
  print("Starting build script.")
  start_time = datetime.now().timestamp()
  if (cleanFiles() and runCompiler()):
    elapsed_time = datetime.now().timestamp() - start_time
    print("Build script completed successfully in " + format(elapsed_time, ".3f") + "s.")
  else:
    print("Build script failed.")
