import random
import time

def get_computer_choice():
    return random.choice(['rock', 'paper', 'scissors'])

def determine_winner(player, computer):
    match (player, computer):
        case (p, c) if p == c:
            return "It's a tie!"
        case ('rock', 'scissors') | ('paper', 'rock') | ('scissors', 'paper'):
            return "You win!"
        case _:
            return "Computer wins!"

def main():
    print("Welcome to Rock, Paper, Scissors!")
    
    # Ask user how many rounds to play
    while True:
        try:
            rounds = int(input("Enter the number of rounds to play: "))
            if rounds <= 0:
                print("Please enter a positive number of rounds.")
            else:
                break
        except ValueError:
            print("Invalid input. Please enter a valid number.")
    
    player_score = 0
    computer_score = 0
    
    for round_num in range(1, rounds + 1):
        print(f"\nRound {round_num}")
        
        player_choice = input("Enter rock, paper, or scissors (or 'quit' to stop): ").strip().lower()
        if player_choice == 'quit':
            print("Thanks for playing!")
            break
        elif player_choice not in ['rock', 'paper', 'scissors']:
            print("Invalid choice. Try again.")
            continue
        
        computer_choice = get_computer_choice()
        print("The computer is thinking...", end="")
        time.sleep(1)  # Simulate a short delay
        print(f"Computer chose: {computer_choice}")
        
        result = determine_winner(player_choice, computer_choice)
        print(result)
        
        # Update scores
        if result == "You win!":
            player_score += 1
        elif result == "Computer wins!":
            computer_score += 1

        print(f"Score after round {round_num}: You - {player_score}, Computer - {computer_score}")
    
    # Final score
    if player_score > computer_score:
        print(f"\nYou win the game with a score of {player_score} to {computer_score}!")
    elif computer_score > player_score:
        print(f"\nComputer wins the game with a score of {computer_score} to {player_score}!")
    else:
        print(f"\nIt's a tie! Final score: You - {player_score}, Computer - {computer_score}")

if __name__ == "__main__":
    main()
