import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IoIosReorder } from 'react-icons/io'

import units from '../../../constants/units'

const Wrapper = styled.div`
  width: 50%;
  padding-right: 40px;
  box-sizing: border-box;

  @media (max-width: 1308px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 24px;
  }
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
  flex-shrink: 0;

  ${props => props.quantity && `
  width: 72px;
  padding-left: 12px;
  padding-right: 12px;
  margin-right: 8px;
  `}
`
const Select = styled.select`
  height: 40px;
  font-size: 13px;
  width: 108px;
  border: 1px solid #C0C9D0;
  flex-shrink: 0;
  border-radius: 5px;
  padding-left: 6px;
  padding-right: 4px;
  box-sizing: border-box;
  margin-right: 8px;
  transition: all 120ms linear;

  &:focus {
    outline: none;
    border: 1px solid #17D764;
  }
`

const IngredientWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-left: -6px;
`
const Reorder = styled.div`
  font-size: 20px;
  flex-shrink: 0;
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

  function updateIngredient (index, field, value) {
    const list = Array.from(ingredients)
    list[index][field] = value
    updateIngredients(list)
  }

  function updateIngredients (list) {
    const incompleteIngredients = list.filter(ingredient => !ingredient.ingredient)
    if (!incompleteIngredients.length) {
      let nextIndex = 0
      list.forEach(({ index }) => {
        if (index >= nextIndex) {
          nextIndex = index + 1
        }
      })
      list.push({ quantity: '', unit: '', ingredient: '', prep: '', index: nextIndex })
    }
    const emptyIngredients = list.filter(ingredient => !ingredient.ingredient && !ingredient.quantity)
    if (emptyIngredients.length >= 2) {
      list.splice(list.findIndex(({ label }) => !label), 1)
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
              {ingredients.map((ingredient, i) => {
                const plural = Number(ingredient.quantity || 0) > 1
                return (
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
                          quantity
                          type="number"
                          placeholder='4'
                          value={ingredient.quantity}
                          onChange={e => updateIngredient(i, 'quantity', e.target.value)}
                        />
                        <Select value={ingredient.unit} onChange={e => updateIngredient(i, 'unit', e.target.value)}>
                          <option value=""/>
                          {units.map(unit => (
                            <option key={unit.label}>{plural ? unit.labelPlural : unit.label}</option>
                          ))}
                        </Select>
                        <Input
                          style={{ flex: 1, width: 'initial', marginRight: 8 }}
                          value={ingredient.ingredient}
                          placeholder='russet potatoes'
                          onChange={(e) => updateIngredient(i, 'ingredient', e.target.value)}
                        />
                        <Input
                          style={{ width: 180 }}
                          value={ingredient.prep}
                          placeholder='peeled and cubed'
                          onChange={(e) => updateIngredient(i, 'prep', e.target.value)}
                        />
                      </IngredientWrapper>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  )
}

IngredientsEditor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  setIngredients: PropTypes.func.isRequired
}

export default IngredientsEditor
