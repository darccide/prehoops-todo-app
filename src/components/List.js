import React, { Component } from 'react';
import {
  getList,
  addItem,
  deleteItem,
  updateItem,
  toggleCompleted
} from './actions/ListActions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      isCompleted: false,
      editDisabled: false,
      items: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleMarkAsCompleted = this.handleMarkAsCompleted.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          title: '',
          category: '',
          isCompleted: false,
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();
    addItem(this.state.title, this.state.category).then(() => {
      this.getAll();
    });
    this.setState({
      title: '',
      category: '',
      isCompleted: false
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.title, this.state.category, this.state.id).then(
      () => {
        this.getAll();
      }
    );
    this.setState({
      title: '',
      category: '',
      isCompleted: '',
      editDisabled: ''
    });
    this.getAll();
  };

  onEdit = (itemid, e) => {
    e.preventDefault();

    var data = [...this.state.items];
    data.forEach(item => {
      if (item.id === itemid) {
        this.setState({
          id: item.id,
          title: item.title,
          category: item.category,
          isCompleted: item.isCompleted,
          editDisabled: true
        });
      }
    });
  };

  handleMarkAsCompleted = (itemid, e) => {
    e.preventDefault();
    toggleCompleted(itemid);
    this.getAll();
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val);
    this.getAll();
  };

  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <div className="row">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={this.state.title || ''}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="row">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={this.state.category || ''}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
          </div>
          {!this.state.editDisabled ? (
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={this.onSubmit.bind(this)}
            >
              Submit
            </button>
          ) : (
            ''
          )}
          {this.state.editDisabled ? (
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.onSubmit.bind(this)}
            >
              Update
            </button>
          ) : (
            ''
          )}
        </form>
        <table className="table">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Category:</th>
            </tr>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.title}</td>
                <td className="text-left">{item.category}</td>
                <td className="text-right">
                  {item.isCompleted ? (
                    <button
                      className="btn btn-sml btn-secondary mr-1"
                      type="button"
                      onClick={this.handleMarkAsCompleted.bind(this, item.id)}
                      value="Unmark as Completed"
                    >
                      Not Completed
                    </button>
                  ) : (
                    <button
                      className="btn btn-sml btn-primary mr-1"
                      type="button"
                      onClick={this.handleMarkAsCompleted.bind(this, item.id)}
                      value="Mark as Completed"
                    >
                      Completed
                    </button>
                  )}
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    disabled={this.state.editDisabled}
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
