FROM node:20.17.0-bookworm-slim

USER node

WORKDIR /home/node/app/

COPY ./entrypoint.sh /home/node/app/entrypoint.sh

EXPOSE 3002

# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
# ENTRYPOINT ["npm", "run", "dev" ]
ENTRYPOINT ["/bin/sh", "-c", "chmod +x /home/node/app/entrypoint.sh && /home/node/app/entrypoint.sh"]
