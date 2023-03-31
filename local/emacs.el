(global-font-lock-mode -1)
(menu-bar-mode -1)

(defun el-rodeo-git-cdup ()
  "Returns the path required to cd up to the .git root"
  (car (process-lines "git" "rev-parse" "--show-cdup")))

(defun build-make-cmd (target)
  (interactive)
  (format "make -C %s %s" (el-rodeo-git-cdup) target))

(defun do-compile ()
  (interactive)
  (async-shell-command (build-make-cmd "compile")))

(defun do-dev-env ()
  (interactive)
  (async-shell-command (build-make-cmd "dev-env")))

(defun do-fmt ()
  (interactive)
  (async-shell-command (build-make-cmd "fmt")))

(defun do-tests ()
  (interactive)
  (async-shell-command (build-make-cmd "tests")))

(global-set-key (kbd "C-c c") 'do-compile)
(global-set-key (kbd "C-c d") 'do-dev-env)
(global-set-key (kbd "C-c f") 'do-fmt)
(global-set-key (kbd "C-c t") 'do-tests)
