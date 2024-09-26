#include <stdio.h>
#include <stdlib.h>

extern char **environ;

int main(int argc, char **argv) {
	printf("Content-Type: text/html\n");
	printf("\n");

	char buf[1024];
	FILE *file;
	size_t read;

	fprintf(stderr, "Opening tmpl file...\n");

	file = fopen("/templates/hello.tmpl", "r");
	if (file) {
		while ((read = fread(buf, 1, sizeof(buf), file)) > 0) {
			fwrite(buf, 1, read, stdout);
		}
		fclose(file);
	} else {
		printf("Could not open file");
	}

	char **env = environ;
	for (; *env; ++env) {
		printf("<p>%s</p>\n", *env);
	}
	
	return 0;
}
