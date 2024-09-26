__attribute__((import_module("env"), import_name("abortX")))
extern void abortX(void);

int add(int a, int b) {
	abortX();
	return a + b;
}
