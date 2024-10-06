FROM node:20.17.0-bookworm-slim

USER node

WORKDIR /home/node/app/

EXPOSE 3002

ENTRYPOINT [ "tail", "-f", "/dev/null" ]
# ENTRYPOINT ["npm", "run", "dev" ]