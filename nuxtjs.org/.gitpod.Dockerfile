FROM gitpod/workspace-full:latest

USER gitpod

RUN sudo bash -cl "echo -e \"\n127.0.0.1       nuxt\n127.0.0.1       ja.nuxt\n127.0.0.1       ko.nuxt\n127.0.0.1       ru.nuxt\n127.0.0.1       zh.nuxt\n127.0.0.1       fr.nuxt\" >> /etc/hosts"
