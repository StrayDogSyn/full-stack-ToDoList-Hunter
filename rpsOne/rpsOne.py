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

def play_game():
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
    ties = 0
    
    for round_num in range(1, rounds + 1):
        print(f"\nRound {round_num}")
        
        # Get player input and handle abbreviations
        player_choice = input("Enter rock, paper, or scissors (or 'quit' to stop): ").strip().lower()

        # Handle abbreviations
        if player_choice == 'r':
            player_choice = 'rock'
        elif player_choice == 'p':
            player_choice = 'paper'
        elif player_choice == 's':
            player_choice = 'scissors'
        
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
        else:
            ties += 1

        print(f"Score after round {round_num}: You - {player_score}, Computer - {computer_score}, Ties - {ties}")
    
    # Final score
    if player_score > computer_score:
        print(f"\nYou win the game with a score of {player_score} to {computer_score}!")
    elif computer_score > player_score:
        print(f"\nComputer wins the game with a score of {computer_score} to {player_score}!")
    else:
        print(f"\nIt's a tie! Final score: You - {player_score}, Computer - {computer_score}")

def ask_play_again():
    while True:
        play_again = input("\nWould you like to play again? (y/n): ").strip().lower()
        if play_again == 'y':
            play_game()
        elif play_again == 'n':
            print("Thanks for playing! Goodbye!")
            break
        else:
            print("Invalid input. Please enter 'y' to play again or 'n' to quit.")

if __name__ == "__main__":
    play_game()
    ask_play_again()
