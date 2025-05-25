import java.util.Random;
import java.util.Scanner;
public class HelloWorld {
    public static void main(String[] args) {
       //1.hello world
        System.out.println("Hello, World!");
        //2. Simple calculator
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the first number: ");
        double num1 = scanner.nextDouble();
        System.out.print("Enter the second number: ");
        double num2 = scanner.nextDouble();
        System.out.println("Choose an operation: +, -, *, /");
        char operation = scanner.next().charAt(0);
        double result;
        switch (operation) {
            case '+' -> {
                result = num1 + num2;
                System.out.println("Result: " + result);
            }
            case '-' -> {
                result = num1 - num2;
                System.out.println("Result: " + result);
            }
            case '*' -> {
                result = num1 * num2;
                System.out.println("Result: " + result);
            }
            case '/' -> {
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Result: " + result);
                } else {
                    System.out.println("Error: Division by zero is undefined.");
                }
            }
            default -> System.out.println("Invalid operation selected.");
        }
        //3.odd or even
        System.out.print("Enter an integer: ");
        int number = scanner.nextInt();
        if (number % 2 == 0) {
            System.out.println(number + " is even.");
        } else {
            System.out.println(number + " is odd.");
        }
        //4. Leap year checker
        System.out.print("Enter a year: ");
        int year = scanner.nextInt();
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year.");
        } else {
            System.out.println(year + " is not a leap year.");
        }
        //5.Multiplication table
        System.out.print("Enter a number to print its multiplication table: ");
        int num = scanner.nextInt();
        System.out.println("Multiplication Table for " + num + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
        //6.data types
        int age = 25;
        float height = 5.9f;
        double weight = 68.75;
        char grade = 'A';
        boolean isStudent = true;
        System.out.println("Integer (int) value: " + age);
        System.out.println("Float (float) value: " + height);
        System.out.println("Double (double) value: " + weight);
        System.out.println("Character (char) value: " + grade);
        System.out.println("Boolean (boolean) value: " + isStudent);
        scanner.close();
        //7. Type casting
        double price = 99.99;
        int intPrice = (int) price;
        System.out.println("Double to Int: " + price + " -> " + intPrice);
        int quantity = 7;
        double doubleQuantity = quantity;
        System.out.println("Int to Double: " + quantity + " -> " + doubleQuantity);
        //8. Operator precedence
        int result1 = 10 + 5 * 2;          
        int result2 = (10 + 5) * 2;       
        int result3 = 20 - 4 / 2 + 3;     
        int result4 = 8 + 3 * 2 - 6 / 3; 
        System.out.println("Result 1 (10 + 5 * 2): " + result1);     
        System.out.println("Result 2 ((10 + 5) * 2): " + result2);  
        System.out.println("Result 3 (20 - 4 / 2 + 3): " + result3); 
        System.out.println("Result 4 (8 + 3 * 2 - 6 / 3): " + result4); 
        //9.Grade calculator
        System.out.print("Enter marks (0-100): ");
        int marks = scanner.nextInt();

        char grade1;

        if (marks >= 90 && marks <= 100) {
            grade1 = 'A';
        } else if (marks >= 80 && marks <= 89) {
            grade1 = 'B';
        } else if (marks >= 70 && marks <= 79) {
            grade1 = 'C';
        } else if (marks >= 60 && marks <= 69) {
            grade1 = 'D';
        } else if (marks >= 0 && marks < 60) {
            grade1 = 'F';
        } else {
            System.out.println("Invalid marks entered.");
            scanner.close();
            return;  
        }

        System.out.println("Grade: " + grade1);
        //10. Number guessing game
        Random random = new Random();
        int targetNumber = random.nextInt(100) + 1;
        int guess = 0;
        System.out.println("Guess the number (between 1 and 100):");
        while (guess != targetNumber) {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();
            if (guess < targetNumber) {
                System.out.println("Too low! Try again.");
            } else if (guess > targetNumber) {
                System.out.println("Too high! Try again.");
            } else {
                System.out.println("Congratulations! You guessed the number.");
            }
        }
    }
}