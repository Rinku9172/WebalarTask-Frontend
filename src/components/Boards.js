import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { RiMore2Fill } from 'react-icons/ri';
import '../App.css';
import boardContext from '../context/boardContext';

const Boards = (props) => {
  const context = useContext(boardContext);
  const { getBoards, boards, deleteBoard, editBoard, createBoard, createTask, deleteTask, editTask } = context;

  const [board, setBoard] = useState({ id: '', eBName: '' });
  const [showModal, setShowModal] = useState(false);
  const [cshowModal, setCShowModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [UTaskModal, setUTaskModal] = useState(false);
  const [boardname, setboardname] = useState('');
  const [taskName, setTaskName] = useState('');
  const [task, setTask] = useState({ title: '', due: '', priority: '' });

  useEffect(() => {
    getBoards();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    editBoard(board.id, board.eBName);
    setShowModal(false);
    props.showAlert("Updated successfully", "success");
  }

  const addBoard = async () => {
    const existingBoard = boards.find(b => b.boardName === board.bName);
    if (existingBoard) {
      props.showAlert("Board with this name already exists", "error");
    } else {
      const result = await createBoard(board.bName);
      if (!result.error) {
        setBoard({ boardName: '' });
        setCShowModal(false);
        props.showAlert("Added successfully", "success");
      }
    }
  }

  const createShowModal = (e) => {
    setCShowModal(true);
  }

  const onChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  }

  const updateBoard = (currentBoard) => {
    setBoard({ id: currentBoard._id, eBName: currentBoard.boardName });
    setShowModal(true);
  }

  const addTaskModal = () => {
    setTaskModal(true);
  }

  const closeTaskModal = () => {
    setTaskModal(false);
  }
  const updateTaskModal = (boardId, taskId) => {
    setUTaskModal(true);
    setTaskName(taskId);
    setboardname(boardId);
  }
  const closeUTaskModal = () => {
    setUTaskModal(false);
  }
  const handleTaskChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const addTask = (e) => {
    e.preventDefault();
    createTask(task.title, task.due, task.priority, boardname);
    setTaskModal(false);
  }
  const updateTask = (e) => {
    e.preventDefault();
    editTask(boardname, taskName, task.title, task.due, task.priority);
    setUTaskModal(false);
  }

  return (
    <div>
      <h1 className='container d-flex justify-content-between' style={{ marginTop: '100px' }}>Boards
        <button type="button" className="btn btn-create" onClick={createShowModal} >
          <FontAwesomeIcon icon={faPlus} /> Create Board
        </button>
      </h1>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', marginTop: '130px' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editBoardModalLabel">Update Board</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleClick}>
                  <div className="mb-3">
                    <label htmlFor="eBName" className="form-label">Board Name</label>
                    <input type="text" className="form-control" id="eBName" name="eBName" aria-describedby="emailHelp" value={board.eBName} onChange={onChange} required />
                  </div>
                  <button type="button" className="btn btn-secondary mt-2 mx-2" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary mt-2">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {cshowModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', marginTop: '120px' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editBoardModalLabel">Create Board</h5>
                <button type="button" className="btn-close" onClick={() => setCShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form className="my-3" onSubmit={addBoard}>
                  <div className="mb-3">
                    <label htmlFor="bName" className="form-label">Board Name</label>
                    <input type="text" className="form-control" id="bName" name="bName" onChange={onChange} minLength={5} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {taskModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editBoardModalLabel">Create task</h5>
                <button type="button" className="btn-close" onClick={() => setTaskModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={addTask}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleTaskChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="due" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="due" name="due" onChange={handleTaskChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select" id="priority" name="priority" onChange={handleTaskChange} required>
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <Button type="button" className="btn btn-secondary mx-2" onClick={closeTaskModal}>Close</Button>
                  <Button type="submit" className="btn btn-primary">Create</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {UTaskModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editBoardModalLabel">Update Task</h5>
                <button type="button" className="btn-close" onClick={() => setUTaskModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateTask}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleTaskChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="due" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="due" name="due" onChange={handleTaskChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select" id="priority" name="priority" onChange={handleTaskChange} required>
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <Button type="button" className="btn btn-secondary mx-2" onClick={closeUTaskModal}>Close</Button>
                  <Button type="submit" className="btn btn-primary">Update</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {boards.length === 0 ? (
            <div className="col-md-12 text-center mt-5">
              <p>No boards created, Create Board to display.</p>
            </div>
          ) : (
            boards.map((board, index) => (
              <div key={index} className="col-md-4 mb-3">
                <Card>
                  <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Card.Title>{board.boardName}</Card.Title>
                    <Dropdown >
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                        <RiMore2Fill />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { deleteBoard(board._id); props.showAlert("Deleted successfully", "success") }}>Delete</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateBoard(board)}>Update</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                  <Card.Body>
                    {board.task.length === 0 ? (
                      <p className="text-center mt-3">No task added.Add Task to display.</p>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {board.task.map((task, taskIndex) => (
                          <li key={taskIndex} className="list-group-item">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <div><strong>Task {taskIndex + 1}:</strong> {task.title}</div>
                              <Dropdown >
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                  <RiMore2Fill />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => { deleteTask(board._id, task._id); props.showAlert("Deleted successfully", "success") }}>Delete</Dropdown.Item>
                                  <Dropdown.Item onClick={() => updateTaskModal(board._id, task._id)}>Update</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div>Due: {task.due}</div>
                            <div>Priority: {task.priority}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Button className='btn btn-add-task w-100' onClick={() => { addTaskModal(); setboardname(board._id); setTaskName(board.task._id) }}>Add Task</Button>
                  </Card.Footer>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

export default Boards;
