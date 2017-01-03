import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingHeading from './FloatingHeading';
import Colors from '../../../../../util/Colors';
import BankedQuestionList from './BankedQuestionList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import AddDialoge from './AddDialoge';
import * as BankedAssessmentApi from '../../../../../api/BankedAssessment';
import * as AssessmentBankActions from '../../../../../actions/AssessmentBank';
import * as OverlayActions from '../../../../../actions/Overlay';
import { toastr } from 'react-redux-toastr';


function testTag(bankedAssessment, tag) {
  const searchString = bankedAssessment
    .tags
    .reduce((a, c) => (a + (c + ' ')), '');
  return (new RegExp(tag.trim())).test(searchString);
}

const fabStyle = {
  position: "absolute",
  bottom: "30px",
  right: "16px",
  zIndex: "10",
}

async function fetchBankedAssessments(
  bankId,
  receivedBankedAssessments,
) {
  try {
    const { error, bankedAssessments }= await BankedAssessmentApi
      .getByBankId(bankId);
    if (!!error) {
      console.error('[ERROR] getByBankId', error);
      return;
    }
    receivedBankedAssessments(bankedAssessments);
  } catch (e) {
    console.error('[ERROR] fetchBankedAssessments', e);
    return null;
  }
}

class QuestionBank extends Component {
  componentDidMount() {
    const {
      bankId,
      receivedBankedAssessments,
    } = this.props;
    try {
      fetchBankedAssessments(
        bankId,
        receivedBankedAssessments
      );
    } catch (e) {
    }
  }


  render() {
    const {
      userId,
      visible,
      bankId,
      removeOption,
      editOptionMode,
      editQuestionMode,
      hideOptions,
      showOptions,
      showOverlay,
      hideOverlay,
      isOverlayVisible,
      overlayType,
      clearAddDialog,
      addOptionAddDialog,
      addOptions,
      removeOptionAddDialog,
      addTags,
      addTagAddDialog,
      removeTagAddDialog,
      addToAssessmentBank,
      courseId,
      editOptionClear,
      editQuestionClear,
      enterAddTagMode,
      cancelAddTagMode,
      saveEdit,
      saveTag,
      removeTag,
      remove,
      moveToBank,
      moveToQueue,
      setBankTag,
      setQueueTag,
      queueTag,
      bankTag,
    } = this.props;

    let inputTagBank = '';
    let inputTagQueue = '';

    return (
      <div className="question-bank">
        <AddDialoge
          isOpen={!!isOverlayVisible
            && overlayType === 'ADD_BANKED_ASSESSMENT'
          }
          onSaveClick={async function(question, options, tags) {
            const created = new Date();
            console.log('!@@@!!@!@!@!@!@!@!@!!!@!@!@!@')
            console.log('tags', tags);
            try {
              const payload = await BankedAssessmentApi
                .create(
                  question,
                  options,
                  tags,
                  created,
                  courseId,
                  bankId,
                  userId,
                );
              const { error, bankedAssessmentId } = payload;
              if (!!error) {
                toastr.error('Server error please try again');
                return;
              }
              addToAssessmentBank(
                bankedAssessmentId,
                tags,
                question,
                options,
                created,
              );
              hideOverlay();
              clearAddDialog();
            } catch (e) {
              console.error('onSaveClick', e);
              toastr.error('Server error please try again');
            }
          }}
          onCancelClick={() => {
            hideOverlay();
            clearAddDialog();
          }}
          options={addOptions}
          tags={addTags}
          onTagAddClick={(content) => {
            addTagAddDialog(content);
          }}
          onTagClearClick={(index, tags) => {
            const remainingTags = [
              ...tags.slice(0, index),
              ...tags.slice(index + 1),
            ];
            removeTagAddDialog(remainingTags);
          }}
          addOptionClick={addOptionAddDialog}
          onOptionClearClick={(index, options) => {
            const remainingOptions = [
              ...options.slice(0, index),
              ...options.slice(index + 1),
            ]
            removeOptionAddDialog(remainingOptions);
          }}
        />
        <FloatingActionButton
          style={fabStyle}
          onClick={() => {
            showOverlay('ADD_BANKED_ASSESSMENT');
          }}
        >
          <FontIcon className="material-icons">
            add
          </FontIcon>
        </FloatingActionButton>
        <FloatingHeading
          inputTagBankRef={(n) => {
            inputTagBank = n;
          }}
          onTagBankClear={() => {
            setBankTag('');
          }}
          tagBankValue={bankTag}
          onInputTagBankChange={(e, v) => {
            setBankTag(v);
          }}
          inputTagQueueRef={(n) => {
            inputTagQueue = n;
          }}
          onTagQueueClear={() => {
            setQueueTag('');
          }}
          tagQueueValue={queueTag}
          onInputTagQueueChange={(e, v) => {
            setQueueTag(v);
          }}
        />
        <div className="c-between">
          <div
            className="r"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div className="half-sliding-strip left">
              <BankedQuestionList
                bankedAssessments={visible
                  .filter(ba => !ba.inQueue && testTag(ba, bankTag))
                }
                onQuestionClick={(questionEditMode, baId) => {
                  if (!questionEditMode) {
                    editQuestionMode(baId);
                    return;
                  }
                }}
                onOptionsDropdownClick={(isOptionsVisible, baId) => {
                  if (!!isOptionsVisible) {
                    hideOptions(baId);
                    return;
                  }
                  showOptions(baId);
                }}
                onOptionClick={(isOptionInEditMode, index, baId) => {
                  if (!isOptionInEditMode) {
                    editOptionMode(index, baId)
                    return;
                  }
                }}
                onOptionClearClick={async (index, baId, options) => {
                  try {
                    const payload = await BankedAssessmentApi
                      .clearOption(index, baId);
                     if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                     }
                    removeOption(index, baId)
                  } catch (e) {
                    console.error('[ERROR] onOptionClearClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                editOptionClear={editOptionClear}
                editQuestionClear={editQuestionClear}
                enterAddTagMode={enterAddTagMode}
                cancelAddTagMode={cancelAddTagMode}
                onTagSaveClick={async function(content, tags, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editTags([...tags, content], baId);
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    saveTag(baId, content)
                  } catch(e) {
                    console.error('[ERROR] onTagSaveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onTagRemoveClick={async function(index, tags, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editTags(
                        [
                          ...tags.slice(0, index),
                          ...tags.slice(index + 1),
                        ],
                        baId
                      );
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    removeTag(baId, index);
                  } catch (e) {
                    console.error('[ERROR] onTagRemoveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onRemoveClick={async function(baId) {
                  try {
                    const payload = await BankedAssessmentApi.remove(baId);
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    remove(baId);

                  } catch (e) {
                    console.error('[ERROR] onRemoveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onSaveClick={async function(question, options, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editById(baId, question, options);
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    saveEdit(baId, payload.question, payload.options);
                  } catch (e) {
                    console.error('[ERROR] onSaveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onToBankClick={async (id) => {
                  try {
                    const payload = await BankedAssessmentApi.moveToBank(id)
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    moveToBank(id);
                  } catch (e) {
                    console.error('[ERROR] onToBankClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onToQueueClick={async (id) => {
                  try {
                    const payload = await BankedAssessmentApi.moveToQueue(id)
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    moveToQueue(id);
                  } catch (e) {
                    console.error('[ERROR] onToBankQueue', e);
                    toastr.error('Something went wrong please try again');
                  }

                }}

              />
            </div>
            <div
              className="half-sliding-strip right"
            >
              <BankedQuestionList
                bankedAssessments={visible.filter(ba => !!ba.inQueue)}
                onQuestionClick={(questionEditMode, baId) => {
                  if (!questionEditMode) {
                    editQuestionMode(baId);
                    return;
                  }
                }}
                onOptionsDropdownClick={(isOptionsVisible, baId) => {
                  if (!!isOptionsVisible) {
                    hideOptions(baId);
                    return;
                  }
                  showOptions(baId);
                }}
                onOptionClick={(isOptionInEditMode, index, baId) => {
                  if (!isOptionInEditMode) {
                    editOptionMode(index, baId)
                    return;
                  }
                }}
                onOptionClearClick={async (index, baId) => {
                  try {
                    const payload = await BankedAssessmentApi
                      .clearOption(index, baId);
                     if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                     }
                    removeOption(index, baId)
                  } catch (e) {
                    console.error('[ERROR] onOptionClearClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                editOptionClear={editOptionClear}
                editQuestionClear={editQuestionClear}
                enterAddTagMode={enterAddTagMode}
                cancelAddTagMode={cancelAddTagMode}
                onTagSaveClick={async function(content, tags, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editTags([...tags, content], baId);
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    saveTag(baId, content)
                  } catch(e) {
                    console.error('[ERROR] onTagSaveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onTagRemoveClick={async function(index, tags, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editTags(
                        [
                          ...tags.slice(0, index),
                          ...tags.slice(index + 1),
                        ],
                        baId
                      );
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    removeTag(baId, index);
                  } catch (e) {
                    console.error('[ERROR] onTagRemoveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onRemoveClick={async function(baId) {
                  try {
                    const payload = await BankedAssessmentApi.remove(baId);
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    remove(baId);

                  } catch (e) {
                    console.error('[ERROR] onRemoveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onSaveClick={async function(question, options, baId) {
                  try {
                    const payload = await BankedAssessmentApi
                      .editById(baId, question, options);
                    const { error } = payload;
                    if (!!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    saveEdit(baId, payload.question, payload.options);
                  } catch (e) {
                    console.error('[ERROR] onSaveClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onToBankClick={async (id) => {
                  try {
                    const payload = await BankedAssessmentApi.moveToBank(id)
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    moveToBank(id);
                  } catch (e) {
                    console.error('[ERROR] onToBankClick', e);
                    toastr.error('Something went wrong please try again');
                  }
                }}
                onToQueueClick={async (id) => {
                  try {
                    const payload = await BankedAssessmentApi.moveToQueue(id)
                    if (!!payload.error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    moveToQueue(id);
                  } catch (e) {
                    console.error('[ERROR] onToBankQueue', e);
                    toastr.error('Something went wrong please try again');
                  }

                }}

              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const stateToProps = (state) => ({
  userId: state.User.id,
  bankId: state.AssessmentBank.id,
  visible: state.AssessmentBank.visible,
  isOverlayVisible: state.Overlay.isVisible,
  overlayType: state.Overlay.type,
  addOptions: !!state.AssessmentBank.add
    ? state.AssessmentBank.add.options
    : [],
  addTags: !!state.AssessmentBank.add
    ? state.AssessmentBank.add.tags
    : [],
  bankTag: state.AssessmentBank.bankTag,
  queueTag: state.AssessmentBank.queueTag,
});

const dispatchToProps = (dispatch) => ({
  removeOption: (index, id) => {
    dispatch(AssessmentBankActions.removeOption(id, index))
  },
  editOptionMode: (index, id) => {
    dispatch(AssessmentBankActions.editOptionMode(id, index))
  },
  editQuestionMode: (id) => {
    dispatch(AssessmentBankActions.editQuestionMode(id))
  },
  hideOptions: (id) => {
    dispatch(AssessmentBankActions.hideOptions(id))
  },
  showOptions: (id) => {
    dispatch(AssessmentBankActions.showOptions(id))
  },
  receivedBankedAssessments: (bankedAssessments) => {
    dispatch(AssessmentBankActions.retrieved(bankedAssessments));
  },
  showOverlay: (type) => {
    dispatch(OverlayActions.setOverlayType(type));
    dispatch(OverlayActions.showOverlay());
  },
  hideOverlay: () => {
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
  },
  clearAddDialog: () => {
    dispatch(AssessmentBankActions.addClear());
  },
  addOptionAddDialog: () => {
    dispatch(AssessmentBankActions.addAnotherOption());
  },
  removeOptionAddDialog: (options) => {
    dispatch(AssessmentBankActions.addRemoveOption(options));
  },
  addTagAddDialog: (tag) => {
    dispatch(AssessmentBankActions.addAnotherTag(tag))
  },
  removeTagAddDialog: (tags) => {
    dispatch(AssessmentBankActions.addRemoveTag(tags));
  },
  addToAssessmentBank: (id, tags, question, options, created) => {
    dispatch(AssessmentBankActions
      .add(
          id,
          tags,
          question,
          options,
          created
        )
    )
  },
  editOptionClear: (id) => {
    dispatch(AssessmentBankActions.editOptionClear(id));
  },
  editQuestionClear: (id) => {
    dispatch(AssessmentBankActions.editQuestionClear(id))
  },
  saveEdit: (id, question, options) => {
    dispatch(AssessmentBankActions.saveEdit(id, question, options));
  },
  enterAddTagMode: (id) => {
    dispatch(AssessmentBankActions.enterAddTagMode(id));
  },
  cancelAddTagMode: (id) => {
    dispatch(AssessmentBankActions.cancelAddTagMode(id));
  },
  saveTag: (id, tag) => {
    dispatch(AssessmentBankActions.addTag(id, tag));
  },
  removeTag: (id, index) => {
    dispatch(AssessmentBankActions.removeTag(id, index));
  },
  remove: (id) => {
    dispatch(AssessmentBankActions.remove(id));
  },
  moveToBank: (id) => {
    dispatch(AssessmentBankActions.moveToBank(id));
  },
  moveToQueue: (id) => {
    dispatch(AssessmentBankActions.moveToQueue(id));
  },
  setBankTag: (bankTag) => {
    dispatch(AssessmentBankActions.setBankTag(bankTag));
  },
  setQueueTag: (queueTag) => {
    dispatch(AssessmentBankActions.setQueueTag(queueTag));
  },
});

QuestionBank = connect(
  stateToProps,
  dispatchToProps,
)(QuestionBank);

export default QuestionBank;
