import java.io.*; 
import java.util.*; 

/* Order Statistics - describe the relative location of an element in 
 * a set of unordered numbers. So the "first order statistic" represents 
 * the smallest value in the unsorted list, and the "second order statistic" 
 * would be the second smallest value from the unsorted collection of numbers
*/ 

class Solution {
    public static void main(String[] args) {
        int[] input = {2, 3, 5, 6, 7}; 
        System.out.println(smallest(input)); 
    }

    /* 
     * find the smallest integer in a set of numbers 
     * 
     * Assume: 
     * - arr will always have 2 or more numbers 
     *
     * Runtime: 
     * - 0^n  
     */
    public static int smallest(int[] arr) {
        int min = arr[0]; 
        for(int i=0; i<arr.length; i++){
            if(arr[i] < min){
                min = arr[i]; 
            }
        }
        return min; 
    }
}