import { Selector } from 'testcafe'
import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
import { VisibilityFilters } from '../src/actions'

fixture `App tests`
    .page('http://localhost:3000')
    .beforeEach(async () => {
        await waitForReact();
    })

test('Loads no initial todos', async t => {
  const todos = await Selector('li')

  // The assertion
  await t.expect(todos.length).eql(0)
})

test('Can add a todo', async t => {
  const form = ReactSelector('AddTodo').find('input')
  await t
    .typeText(form, 'Shopping')
    .expect(form.value).eql('Shopping')

  await t.click(ReactSelector('AddTodo').find('button'))
  const todo = ReactSelector('Todo')
  
  // The assertion
  await t.expect(todo.count).eql(1)
})

test('Can complete a todo', async t => {
  const form = ReactSelector('AddTodo').find('input')
  await t
    .typeText(form, 'Clean car')
    .expect(form.value).eql('Clean car')

  await t.click(ReactSelector('AddTodo').find('button'))
  const todo = await t.click(ReactSelector('Todo'))

  const completedTodo = ReactSelector('Todo').withProps({
    completed: true
  })

  // The assertion
  await t.expect(completedTodo.count).eql(1)
})

test('Can filter todos', async t => {
  const form = ReactSelector('AddTodo').find('input')
  await t
    .typeText(form, 'Buy soap')
    .expect(form.value).eql('Buy soap')

  await t.click(ReactSelector('AddTodo').find('button'))
  const todo = await t.click(ReactSelector('Todo'))

  const completedTodo = ReactSelector('Todo').withProps({
    completed: true
  })

  await t.expect(completedTodo.count).eql(1)

  await t
    .typeText(form, 'Use soap')
    .expect(form.value).eql('Use soap')
  await t.click(ReactSelector('AddTodo').find('button'))

  const todos = ReactSelector('Todo')
  await t.expect(todos.count).eql(2)

  await t.click(ReactSelector('Link').withText('Active'))
  await t.expect(todos.count).eql(1)

  await t.click(ReactSelector('Link').withText('All'))
  await t.expect(todos.count).eql(2)

  await t.click(ReactSelector('Link').withText('Completed'))
  await t.expect(todos.count).eql(1)
})

test('Shows loading state', async t => {
  const form = ReactSelector('AddTodo').find('input')
  await t
    .typeText(form, 'Shopping')
    .expect(form.value).eql('Shopping')

  const btn = ReactSelector('AddTodo').find('button')
  await t.click(btn)
  
  // The assertion
  await t.expect(btn.hasAttribute('disabled')).ok()
})