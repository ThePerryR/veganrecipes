import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IoIosReorder } from 'react-icons/io'

const Wrapper = styled.div`
  width: 50%;
  padding-right: 40px;
  box-sizing: border-box;
`

const Label = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #5e5e5e;
`

const Input = styled.input`
  height: 40px;
  font-size: 13px;
`

const IngredientWrapper = styled.div`
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function IngredientsEditor ({ ingredients, setIngredients }) {
  const onDragEnd = useCallback(({ source, destination }) => {
    if (source && destination) {
      setIngredients(reorder(ingredients, source.index, destination.index))
    }
  }, [ingredients])

  function updateIngredients (list) {
    const emptyIngredients = list.filter(ingredient => !ingredient.label)
    if (!emptyIngredients.length) {
      let nextIndex = 0
      list.forEach(({ index }) => {
        if (index >= nextIndex) {
          nextIndex = index + 1
        }
      })
      list.push({ label: '', index: nextIndex })
    }
    if (emptyIngredients.length >= 2) {
      list.splice(list.findIndex(({label}) => !label), 1)
    }
    setIngredients(list)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Label>Ingredients</Label>
        <Droppable droppableId="droppable-1" type="INGREDIENT">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{}}
              {...provided.droppableProps}>
              {ingredients.map((ingredient, i) => (
                <Draggable
                  key={ingredient.index}
                  draggableId={`draggable-${ingredient.index}`}
                  index={i}
                  type="INGREDIENT">
                  {(provided, snapshot) => (
                    <IngredientWrapper
                      ref={provided.innerRef}
                      {...provided.draggableProps}>
                      <Reorder {...provided.dragHandleProps}>
                        <IoIosReorder/>
                      </Reorder>
                      <Input
                        value={ingredient.label}
                        onChange={(e) => {
                          const list = Array.from(ingredients)
                          list[i].label = e.target.value
                          updateIngredients(list)
                        }}
                      />
                    </IngredientWrapper>
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

IngredientsEditor.propTypes = {}

export default IngredientsEditor
