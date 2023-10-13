import os
import subprocess
import shutil
from datetime import datetime


if __name__ == "__main__":
  print("Starting prepare script.")
  start_time = datetime.now().timestamp()

  try:
    # Find NPM's path.
    npm_path = shutil.which("npm")

    if type(npm_path) != str:
      raise Exception("Unable to find Node Package Manager (npm).")
    
    # Install both Sass and Typescript via NPM.
    process_results = subprocess.run([npm_path, "install", "sass"])

    if (process_results.returncode != 0):
      raise Exception("Error installing Sass via npm.")
    
    process_results = subprocess.run([npm_path, "install", "typescript"])

    if (process_results.returncode != 0):
      raise Exception("Error installing TypeScript via npm.")

    elapsed_time = datetime.now().timestamp() - start_time
    print("Prepare script completed successfully in " + format(elapsed_time, ".3f") + "s.")
  except Exception as ex:
    print("Prepare script failed: " + str(ex))
