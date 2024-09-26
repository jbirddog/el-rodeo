#include <stdio.h>

int main(int argc, char **argv) {
	printf("Content-Type: application/json\n");
	printf("Access-Control-Allow-Origin: *\n");
	printf("X-Bob: Joe\n");
	printf("\n");
	printf("{\"status\": \"ok\"}");
	return 0;
}
