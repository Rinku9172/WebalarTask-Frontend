
import { useState } from "react";
import boardContext from "./boardContext";
const BoardState = (props) => {
    const host = "https://webalar-task.vercel.app";
    const boardsInitial = [];
    const [boards, setBoards] = useState(boardsInitial);

    //Get all boards
    const getBoards = async () => {
        // API call
        const response = await fetch(`${host}/api/task/fetchAllBoards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json()
        setBoards(json);
    }

    const createBoard = async (boardName) => {
        const response = await fetch(`${host}/api/task/createBoard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ boardName }),
        });

        const board = await response.json();
        getBoards();
    }

    const deleteBoard = async (id) => {
        const response = await fetch(`${host}/api/task/deleteBoard/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        const newBoards = boards.filter((board) => { return board._id !== id })
        setBoards(newBoards)

    }

    const editBoard = async (id, boardName) => {
        const response = await fetch(`${host}/api/task/updateBoard/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ boardName }),

        });
        const json = await response.json();
        console.log(json);
        let newBoards = JSON.parse(JSON.stringify(boards));
        for (let index = 0; index < newBoards.length; index++) {
            const element = newBoards[index];
            if (element._id === id) {
                newBoards[index].boardName = boardName;

                break;
            }
        }
        setBoards(newBoards);
    }

    const createTask = async (title, due, priority, boardid) => {
        const response = await fetch(`${host}/api/task/createTask/${boardid}/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, due, priority }),
        });

        const board = await response.json();
        // setBoards(boards.concat(board))
        console.log(title, due, priority)
        getBoards();
    }

    const deleteTask = async (boardid, taskid) => {
        const response = await fetch(`${host}/api/task/deleteTask/${boardid}/${taskid}/task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        const newBoards = boards.filter((task) => { return task._id !== boardid._id })
        setBoards(newBoards)
        getBoards();
    }

    const editTask = async (boardId, taskId, title, due, priority) => {
        const response = await fetch(`${host}/api/task/updateTask/${boardId}/${taskId}/task`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, due, priority }),
        });
        const json = await response.json();
        console.log(json);
        getBoards(); // Fetch updated boards after updating task
    }


    return (
        <boardContext.Provider value={{ boards, getBoards, deleteBoard, editBoard, createBoard, createTask, deleteTask, editTask }}>
            {props.children}
        </boardContext.Provider>
    )
}
export default BoardState;