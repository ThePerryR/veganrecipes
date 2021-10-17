import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IoIosReorder } from 'react-icons/io'
import uploadWidgetStyles from '../../../utils/uploadWidgetStyles'

const Wrapper = styled.div`
  width: 50%;

  @media (max-width: 1308px) {
    width: 100%;
  }
`

const Label = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #5e5e5e;
`

const Input = styled.textarea`
  font-size: 13px;

`

const InstructionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-left: -6px;
`
const Reorder = styled.div`
  font-size: 20px;
  color: grey;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const NewButton = styled.div`
  width: 80px;
  height: 80px;
  border: 2px dashed #cbcbcb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-right: 8px;
  flex-shrink: 0;
  text-align: center;

  box-sizing: border-box;
  font-size: 13px;
  cursor: pointer;
  color: grey;
  transition: all 120ms linear;

  &:hover {
    border: 2px dashed grey;
  }
`

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

let uploadWidget
function InstructionsEditor ({ instructions, setInstructions }) {
  const onDragEnd = useCallback(({ source, destination }) => {
    if (source && destination) {
      setInstructions(reorder(instructions, source.index, destination.index))
    }
  }, [instructions])

  const widgetCallback = (err, result) => {
    if (err) {
      return console.log(err)
    }
    if (result.event === 'success') {
      console.log(result.info.public_id)
    }
  }
  useEffect(() => {
    uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'easyvgn',
      uploadPreset: 'instruction-images-unsigned',
      cropping: true,
      cropping_aspect_ratio: 1,
      showSkipCropButton: false,
      sources: ['local', 'url', 'facebook', 'instagram'],
      styles: uploadWidgetStyles
    }, (err, result) => widgetCallback(err, result))
  }, [])

  function updateInstructions (list) {
    const emptyInstructions = list.filter(instructions => !instructions.label)
    if (!emptyInstructions.length) {
      let nextIndex = 0
      list.forEach(({ index }) => {
        if (index >= nextIndex) {
          nextIndex = index + 1
        }
      })
      list.push({ label: '', index: nextIndex })
    }
    if (emptyInstructions.length >= 2) {
      list.splice(list.findIndex(({ label }) => !label), 1)
    }
    setInstructions(list)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}>
      <Wrapper>
        <Label>Instructions</Label>
        <Droppable droppableId="droppable-2" type="INSTRUCTION">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{}}
              {...provided.droppableProps}>
              {instructions.map((instruction, i) => (
                <Draggable
                  key={instruction.index}
                  draggableId={`draggable-${instruction.index}`}
                  index={i}
                  type="INSTRUCTION">
                  {(provided) => (
                    <InstructionWrapper
                      ref={provided.innerRef}
                      {...provided.draggableProps}>
                      <Reorder {...provided.dragHandleProps}>
                        <IoIosReorder/>
                      </Reorder>
                      <Input
                        value={instruction.label}
                        onChange={(e) => {
                          const list = Array.from(instructions)
                          list[i].label = e.target.value
                          updateInstructions(list)
                        }}
                      />

                      <NewButton onClick={() => uploadWidget.open()}>
                        Add Image
                      </NewButton>
                    </InstructionWrapper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  )
}

InstructionsEditor.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setInstructions: PropTypes.func.isRequired
}

export default InstructionsEditor
