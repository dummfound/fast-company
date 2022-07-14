import React from 'react';
import Quality from './quality';
import Bookmark from './bookmark';

const User = ({user, onDelete, onChangeBookmark}) => {

    return (
        <tr>
                  <td>{user.name}</td>
                  <td>
                    {
                      <ul>
                        {user.qualities.map((qualitie) => (
                          <Quality key={qualitie._id}  qualitie = {qualitie}/>
                        ))}
                      </ul>
                    }
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td><Bookmark status = {user.bookmark} onChangeBookmark={onChangeBookmark} user = {user}/></td>
                 
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(user._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>     
    )
}

export default User;