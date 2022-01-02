import MessagesMenuItem from "./MessagesMenuItem";
import MessagesPane from "./MessagesPane";
import { v4 } from "uuid";

export default {
  menuItem: MessagesMenuItem,
  render: () => <MessagesPane key={v4()} />,
};
