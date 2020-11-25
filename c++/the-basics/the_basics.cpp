# include <cstdio> 

int main () 
{ 
    // value designators and printf 
    int x = 25; 
    int y = 500; 
    printf("x = %i and y = %i\n", x, y); 

    // positive "field width" with printf 
    printf("%6i%4i\n", 45, 300);
    printf("%6i%4i\n", 25000, 2);
    printf("%6i%4i\n", 500, 27);

    // negative "field width" example
    printf("%-6i%-4i\n", 45, 300);
    printf("%-6i%-4i\n", 25000, 2);
    printf("%-6i%-4i\n", 500, 27);

    // value designators in numbers with decimals 
    double stddev = 450.346; 
    printf("The standard deviation is %10.2lf\n", stddev);

}


