import { ITodo } from ".";

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  item: ITodo;
}

export const TodoCard = ({ item, ...others }: TodoCardProps) => {
  return (
    <div className="bg-purple-500 text-white mb-4" key={item.id} {...others}>
      {item.title}
    </div>
  );
};
