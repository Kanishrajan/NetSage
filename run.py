import sys
import subprocess
import os

def main():
    print("==================================================")
    print(" NetSage AI - Master Execution CLI")
    print("==================================================")
    print("1. Validate Dataset (data/cases.json)")
    print("2. Run Rule Engine Tests (pytest)")
    print("3. Run AI Evaluation Suite")
    print("4. Generate/Regenerate Dataset")
    print("5. Exit")
    print("--------------------------------------------------")
    
    if len(sys.argv) > 1:
        choice = sys.argv[1]
    else:
        choice = input("Select an option (1-5): ").strip()
        
    if choice == "1":
        from scripts.validate_dataset import validate_dataset
        success = validate_dataset()
        sys.exit(0 if success else 1)
    elif choice == "2":
        ret = subprocess.call(["pytest", "tests/"])
        sys.exit(ret)
    elif choice == "3":
        from scripts.run_evaluation import main as run_eval
        run_eval()
    elif choice == "4":
        from scripts.generate_dataset import main as gen_ds
        from scripts.generate_review_log import main as gen_rl
        gen_ds()
        gen_rl()
        print("Dataset and review log generated successfully.")
    else:
        print("Exiting.")

if __name__ == "__main__":
    main()
