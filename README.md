# TODO APP FRONTEND IN REACT

Simple app for todo tasks, with docker and CI/CD with github actions

Want to use docker? No problem use next commands...

```sh
docker image build . -t react-frontend 
docker run -p 80:3000 -d react-frontend #If your port 80 is taken change it but leave alone right side of :
```

Visit http://localhost:80 to see your frontend

## What can you do?

Add task and see all tasks on front page. You can sort them ASC or DESC(default) by creation date.
You can edit task by clicking on it, change text or mark it done. Upon successful update you are returned back to front page, if you marked it as done it will be green with line through, also it will show updated at date now.

## Tools used

- Typescript
- Eslint with airbnb code style
- Prettier
- Axios
- Tailwind

Visit http://165.232.121.71/ for working example.