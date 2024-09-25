#include <stdio.h>

int main(int argc, char **argv) {
	printf("Content-Type: application/json\n\n");
	printf("{\"status\": \"ok\"}");
	return 0;
}
