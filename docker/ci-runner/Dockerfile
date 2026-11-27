# A GitHub Actions runner for this repo that runs on a developer machine with Docker
# (used when GitHub-hosted minutes run out). It has its own Docker engine inside, so the
# workflows' service containers, container jobs and image builds behave as they do on
# GitHub's ubuntu-24.04 runners. See README.md.
FROM ghcr.io/actions/actions-runner:2.338.2

USER root

# Docker engine and the tools the workflows call directly (git, curl, openssl, jq).
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl gnupg git jq openssl unzip iptables libatomic1 python3 xz-utils zstd \
  && install -m 0755 -d /etc/apt/keyrings \
  && curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc \
  && chmod a+r /etc/apt/keyrings/docker.asc \
  && . /etc/os-release \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io docker-buildx-plugin \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV RUNNER_ALLOW_RUNASROOT=1
WORKDIR /home/runner
# The image defaults to the runner user; compose.yml starts it as root (see there why).
USER runner
ENTRYPOINT ["/entrypoint.sh"]
