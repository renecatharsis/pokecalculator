type UnorderedListParams = {
  text: string;
};

export default function UnorderedList({ text }: UnorderedListParams) {
  return (
    <li className="text-body-color mb-1 flex text-base">
      <span className="bg-primary mr-2 mt-2 flex h-2 w-full max-w-[8px] items-center justify-center rounded-full text-base"></span>
      {text}
    </li>
  );
}
