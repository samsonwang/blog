# blog 编译环境：Nikola + Emacs(org-mode) + Pygments
#
# 为什么是 Debian slim 而不是 Alpine：
#   1. lxml / Pillow 有现成 manylinux wheel，Alpine(musl) 上要现场编译；
#   2. emacs 在 glibc 下最稳，musl 版对 UTF-8 locale、子进程 shell 的坑更多；
#   3. 本博客正文是全中文，Debian 的 C.UTF-8 支持开箱即用。
#
# 为什么把 emacs 版本钉在 bookworm（Emacs 28.2 / org 9.5）：
#   plugins/orgmode/init.el 用了 org 的私有函数 org-macro--collect-macros
#   和 4 参数版 org-html-export-as-html，org 9.7（Debian 13 / Emacs 30）
#   有改动风险；GitHub Actions 用的是 Emacs 26.3，28.2 是稳妥的折中。
#
# 构建上下文 = 本目录（docker/），镜像里不放源码；仓库是运行时 bind mount 到 /site。
FROM python:3.12-slim-bookworm

ENV PYTHONUNBUFFERED=1 \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    TZ=Asia/Shanghai \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# emacs-nox       : 只要 batch 导出，不需要 X11
# elpa-htmlize    : 插件的 init.el 依赖 htmlize 做代码块高亮（装不上时后面会自动从 melpa 补）
# git             : nikola github_deploy 需要
RUN apt-get update && apt-get install -y --no-install-recommends \
        emacs-nox \
        git \
        ca-certificates \
        tzdata \
    && (apt-get install -y --no-install-recommends elpa-htmlize \
        || echo "elpa-htmlize 不可用，稍后从 melpa 装 htmlize") \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo "$TZ" > /etc/timezone \
    && rm -rf /var/lib/apt/lists/*

RUN pip install "Nikola[extras]"

# 把 htmlize 烘进镜像：插件里的 init.el 在每次导出时都会检查 htmlize，
# 缺失时它会自己去连 melpa-stable 装包 —— 那样每次编译都要联网，还可能失败。
RUN emacs --batch --eval "(progn \
      (require 'package) \
      (add-to-list 'package-archives '(\"melpa-stable\" . \"https://stable.melpa.org/packages/\")) \
      (package-initialize) \
      (unless (package-installed-p 'htmlize) \
        (package-refresh-contents) \
        (package-install 'htmlize)) \
      (unless (require 'htmlize nil t) (error \"htmlize unavailable\")) \
      (princ \"htmlize ok\n\"))"

# 自检：orgmode 插件靠这三个东西干活（emacs / pygmentize / nikola）
RUN emacs --version | head -1 \
    && pygmentize -V \
    && nikola --version

# bind mount 进来的仓库可能被 git 判为 dubious ownership
# 用 --system 写进 /etc/gitconfig，换任何 uid 跑容器都生效
RUN git config --system --add safe.directory /site

# 进容器后默认落在 /site，省得每次都 cd
RUN printf 'cd /site 2>/dev/null\n' >> /root/.bashrc

WORKDIR /site

# 只为 nikola serve / auto 的本地预览
EXPOSE 8000

# 默认常驻，方便 docker compose exec site bash 进去干活
CMD ["sleep", "infinity"]
