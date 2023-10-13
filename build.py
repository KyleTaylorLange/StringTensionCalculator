import os
import subprocess
import shutil
from datetime import datetime

# Deletes old files from distribution directories.
def cleanFiles():
  print("Deleting old files.")
  paths_to_delete = [os.path.join("dist", "src"), os.path.join("dist", "json"), os.path.join("dist", "css")]

  for rel_path in paths_to_delete:
    if (os.path.exists(rel_path)):
      try:
        shutil.rmtree(rel_path)
        print("  Deleted: " + rel_path)
      except:
        raise Exception("Unable to delete: " + rel_path)

# Runs the TypeScript compiler.
def runTypeScriptCompiler():
  # Run the TypeScript compiler
  ts_compiler_path = shutil.which("tsc")

  if type(ts_compiler_path) != str:
    raise Exception("Unable to find TypeScript compiler (TSC).")

  print("Running the TypeScript Compiler")
  process_results = subprocess.run([ts_compiler_path])

  if (process_results.returncode != 0):
    raise Exception("Error during compilation.")

  print("Compilation finished successfully.")

def buildStyles():
    # Ensure Node Package Manager is installed.
    print("Building SASS styles.")
    npm_path = shutil.which("npm")
    if type(npm_path) != str:
      raise Exception("unable to find Node Package Manager")
    
    # Rebuild the SASS styles.
    process_results = subprocess.run([npm_path, "run", "build-styles"])
    if (process_results.returncode != 0):
      raise Exception("error building SASS styles")
    print("Styles built successfully.")

if __name__ == "__main__":
  print("Starting build script.")
  start_time = datetime.now().timestamp()

  try:
    cleanFiles()
    runTypeScriptCompiler()
    buildStyles()
    elapsed_time = datetime.now().timestamp() - start_time
    print("Build script completed successfully in " + format(elapsed_time, ".3f") + "s.")
  except Exception as ex:
    print("Build script failed: " + str(ex))
