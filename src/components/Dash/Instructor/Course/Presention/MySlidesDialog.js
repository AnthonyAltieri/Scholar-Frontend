import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {toastr} from 'react-redux-toastr'
import TextField from '../../../../TextField'
import Colors from '../../../../../util/Colors';
import { getPresentations } from '../../../../../api/Course'

let presentations;

class MySlidesDialog extends Component {
  async componentWillMount(){
    const { courseId } = this.props;
    presentations = await getPresentations(courseId);

  }

  render(){
    const { isOpen, onCancelClick, onSubmitClick, onSelectUrl } = this.props;

    let choiceList;
    if(!!presentations && presentations.length) {
         choiceList = (
           <div >

             <b style={{fontSize : "20px"}}> Or Select one from the list: </b>
              <ul className="add-code-list">
                {presentations.map((p) => (
                  <li key={p.id} className="r-between">

                    <p style={{ width: "150px" }}>{p.title}</p>

                    <p style={{ color: Colors.green, cursor: "pointer", width: "150px" }} onClick={ () => { onSelectUrl(p.url, p.id) }}> SELECT </p>
                    <a href={p.url} target="_blank">VIEW IN NEW TAB</a>
                  </li>
                ))}
              </ul>
           </div>
        )
    }

    const handleCancelClicked = () => {
      onCancelClick();
    };

    let slideUrl = "";
    let slideTitle;

    return (<Dialog
      title={"Insert a link to your Google Slides Presentation"}
      open={isOpen}
      modal={false}
      autoScrollBodyContent
      contentStyle={{
      }}
      actions={[
        <FlatButton
          label="Submit Link"
          onTouchTap={() => {
            onSubmitClick(slideUrl.value, !!slideTitle? slideTitle.value : null);
          }}
          style={{ color: Colors.green }}
        />,
        <FlatButton
          label="Cancel"
          onTouchTap={handleCancelClicked}
          style={{ color: Colors.red }}
        />]}>
        <TextField
          style={{width: '600px'}}
          floatingLabelText="Title For Your Presentation"
          id="new-slides-title"
          ref={() => {
            slideTitle = document.getElementById('new-slides-title');
          }}
        />
        <TextField
          style={{width: '600px'}}
          floatingLabelText="Google Slides URL"
          id="new-slides-url"
          ref={() => {
             slideUrl = document.getElementById('new-slides-url');
          }}
        />
        {choiceList}

  </Dialog>
    )
  }

  componentWillUnmount(){
    presentations = null;
  }

}

export default MySlidesDialog;