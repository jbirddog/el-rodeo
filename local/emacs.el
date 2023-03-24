(global-font-lock-mode -1)
(menu-bar-mode -1)

(defvar *anchor-dir*)

(defun set-anchor-dir ()
  (interactive)
  (setq *anchor-dir* (expand-file-name default-directory)))

(set-anchor-dir)

(defun build-make-cmd (target)
  (interactive)
  (format "make -C %s %s" *anchor-dir* target))

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
