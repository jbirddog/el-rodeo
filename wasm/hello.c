#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

extern char **environ;

int main(int argc, char **argv) {
	printf("Content-Type: text/html\n\n");
	printf("<html><head><title>Hello</title><body><h1>hello</h1>\n");

	printf("<h3>argv</h3>\n");
	printf("<ul>\n");

	for (int i = 0; i < argc; ++i) {
		printf("<li>%s</li>\n", argv[i]);
	}
	
	printf("</ul>\n");

	printf("<h3>cwd</h3>\n");

	char cwd[4096];
	if (getcwd(cwd, sizeof(cwd)) != NULL) {
		printf("<p>%s</p>\n", cwd);
	}
	
	printf("<h3>env</h3>\n");

	const char *envs[] = {
		"SCRIPT_FILENAME",
		NULL,
	};

	for (int i = 0;; ++i)  {
		const char *key = envs[i];
		if (!key) break;
		
		const char *val = getenv(key);
		printf("<p>%s: %s</p>\n", key, val);
	}

	char **env = environ;
	for (; *env; ++env) {
		printf("%s<br />\n", *env);
	}

	printf("</body></html>\n\n");
	return 0;
}
