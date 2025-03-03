import random
import time

def get_computer_choice():
    return random.choice(['rock', 'paper', 'scissors', 'lizard', 'spock'])

def determine_winner(player, computer):
    # Define the winning conditions
    if player == computer:
        return "It's a tie!"
    
    # Rock crushes Scissors and crushes Lizard
    if (player == 'rock' and (computer == 'scissors' or computer == 'lizard')) or \
       (player == 'paper' and (computer == 'rock' or computer == 'spock')) or \
       (player == 'scissors' and (computer == 'paper' or computer == 'lizard')) or \
       (player == 'lizard' and (computer == 'spock' or computer == 'paper')) or \
       (player == 'spock' and (computer == 'scissors' or computer == 'rock')):
        return "You win!"
    
    return "Computer wins!"

def main():
    print("Welcome to Rock, Paper, Scissors, Lizard, Spock!")
    print("Hint: Use these shortcuts - r = rock, p = paper, s = scissors, l = lizard, k = spock")

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
        player_choice = input("Enter rock, paper, scissors, lizard, or spock (or 'quit' to stop): ").strip().lower()

        # Handle abbreviations
        if player_choice == 'r':
            player_choice = 'rock'
        elif player_choice == 'p':
            player_choice = 'paper'
        elif player_choice == 's':
            player_choice = 'scissors'
        elif player_choice == 'l':
            player_choice = 'lizard'
        elif player_choice == 'k':
            player_choice = 'spock'
        
        if player_choice == 'quit':
            print("Thanks for playing!")
            break
        elif player_choice not in ['rock', 'paper', 'scissors', 'lizard', 'spock']:
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
    print(f"\nFinal Score: You - {player_score}, Computer - {computer_score}, Ties - {ties}")
    
    if player_score > computer_score:
        print(f"\nYou win the game with a score of {player_score} to {computer_score}!")
    elif computer_score > player_score:
        print(f"\nComputer wins the game with a score of {computer_score} to {player_score}!")
    else:
        print(f"\nIt's a tie! Final score: You - {player_score}, Computer - {computer_score}, Ties - {ties}")
    
    # Ask if the user wants to play again
    while True:
        play_again = input("\nWould you like to play again? (y/n): ").strip().lower()
        if play_again == 'y':
            main()
        elif play_again == 'n':
            print("Thanks for playing! Goodbye!")
            break
        else:
            print("Invalid input. Please enter 'y' to play again or 'n' to quit.")

if __name__ == "__main__":
    main()
# This code is a complete, self-contained implementation of the Rock, Paper, Scissors, Lizard, Spock game.
# It includes the main game loop, score tracking, and the ability to play multiple rounds or quit.
# The game also handles abbreviations for the choices and provides a clear user interface.
# The code is designed to be user-friendly and includes error handling for invalid inputs.
# The game logic is implemented in the determine_winner function, which checks the rules of the game.
# The get_computer_choice function randomly selects the computer's choice from the available options.
# The main function orchestrates the game flow, including user input, score updates, and final results.
# The game can be played multiple times, and the user is prompted to play again at the end of each game.
# The code is structured to be easily readable and maintainable, with clear function definitions and comments.