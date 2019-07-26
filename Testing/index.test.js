import axios from "axios";
import Game from "../src/Components/Game/Game";
import Lobby from "../src/Components/Lobby/Lobby";

jest.mock("axios");

test("should fetch users", () => {
  const users = [{ username }];
  const resp = { data: username };
  axios.get.mockResolvedValue(resp);
  return Users.all().then(data => expect(data).toEqual(users));
});

test("it should delete users", () => {
  const users = [{ id, username }];
  const resp = { data: id, username };
  axios.delete.mockResolvedValue(resp);
  return Users.all().then(data => expect(data).toEqual(users));
});

test("testing usernames passing through", () => {
  const data = testData();
  expect(data).toMatchInlineSnapshot(`
  Object {
    "username": Object {
      "username": "data"
    },
  }
  `);
});

test("renders lobby component", () => {
  const component = renderer.create(<Lobby />);
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders game component", () => {
  const component = renderer.create(<Game />);
  expect(component.toJSON()).toMatchSnapshot();
});
