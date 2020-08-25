# Intro to OOP with Ruby 

OOP or "Object-oriented programming" is a type of programming that is based on the concept of "objects"which can contain: 
* _data_ (in the form of 'fields', and often known as 'attributes' or 'properties')
* _code_ in the form of "procedures"/"methods".


OOP is about structuring code so that its functionality can be shared throughout an application. 

> "An object-oriented approach to application development makes programs more intuitive to design, faster to develop, more amenable to modification, and easier to understand." —Object-Oriented Programming with Objective-C, Apple Inc.

> "As humans, we’re constantly faced with myriad facts and impressions that we must make sense of. To do so, we must abstract underlying structure away from surface details and discover the fundamental relations at work. Abstractions reveal causes and effects, expose patterns and frameworks, and separate what’s important from what’s not. Object orientation provides an abstraction of the data on which you operate; moreover, it provides a concrete grouping between the data and the operations you can perform with the data—in effect giving the data behavior." —Object-Oriented Programming with Objective-C, Apple Inc.


## Classes and Instances 

A class is a "blue print" of an "object". 

In Ruby we can define a class using the `class` keyword. 

```rb
# basic class definition 
class Student 
end 
```
The key word `end` denotes the ending of the class. All the code placed between the name of the class (`Student`) and the keyword `end` defines the class definition. By convention (in Ruby) we capatalize class names to differentiate them from variables. 

Whenever the `new` method is called on a class, whatever code is placed inside that class's `intialize` method (aka "constructor") will be executed.
```rb
# class definition: 
class Student 
    # construcotr 
    def initialize name
        # `@` denotes a class variable (local variable)
        @name = name 
    end 
end 

# class instantiation 
new_student = Student.new('Aaron') 
# `new_student = Student.new 'Aaron'` => would also work: 
#   in Ruby, arguements can be passed to methods simply by placing 
#   them after the method call in a space deliniated list. 
```

## Methods

As you can notice when creating a student (`new_student = Student.new('Aaron')`), we are using the class name `Student` and using _dot notation_ to call the constructor method (`new`), and last we pass it the argument `'Aaron'`. 

Think of this like taking a blue print defining what a student is (the class) and creating a material version from that definition. This is referred to as an "instance", and we can perform "actions" or "procedures" on objects by calling methods, which essentially perform a series of instructions based on the information internal to the object's state (_and if that went over your head, don't worry about it_). 

Methods allow us to encapsulate behavior (actions) that we may want to repeat; for a car this might be something like `car.start()`, `car.accelerate()`, `car.decelerate`, `car.stop()`, `car.honk()` (which could be called without the `()` as well), something like: 
```rb
class Car 
    def initialize 
        @speed = 0 # initially, the car should not be moving 
        @running = false 
        @headlights_on = false 
    end 

    # enabled the car to move 
    def start 
        @running = true 
        @headlight_on = true 
    end 

    # increase its speed 
    def accelerate 
        if @running && @speed < 100
            @speed = @speed + 1 
        elsif !@running 
            puts 'car must be running' 
        end 
    end 

    # decrease the speed of itself 
    def decelerate 
        if !@running 
            puts 'Car must be running to decelerate' 
        elsif @speed > 1 
            @speed = @speed - 1 
        end 
    end 

    # make sound 
    def honk
        puts 'Beeep!!!'
    end 

    # Turn off the car 
    def stop
        @speed = 0 
        @headlights_on = false 
        @running = false 
    end 
end 
```






