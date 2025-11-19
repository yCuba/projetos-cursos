import Text from "./components/text";
import TrashIcon from "./assets/icons/Trash.svg?react";
import CheckIcon from "./assets/icons/Check.svg?react";
import PencilIcon from "./assets/icons/Pencil.svg?react";
import PlusIcon from "./assets/icons/Plus.svg?react";
import SpinnerIcon from "./assets/icons/spinner.svg?react";
import XIcon from "./assets/icons/X.svg?react";
import Icon from "./components/icon";
import Badge from "./components/badge";
import Button from "./components/button";
import ButtonIcon from "./components/button-icon";

export default function App() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-1">
        <Text variant="body-sm-bold" className="text-pink-base">
          Olá Mundo!
        </Text>
        <Text className="text-green-base">
          Olá Mundo!
        </Text>
        <Text variant="body-md-bold">
          Olá Mundo!
        </Text>
        <Text>
          Levar o dog pra passear
        </Text>
      </div>

      <div className="Flex gap-1">
        <Icon svg={TrashIcon} className="fill-green-base" />
        <Icon svg={CheckIcon} className="fill-pink-base" />
        <Icon svg={PencilIcon} className="fill-pink-dark" />
        <Icon svg={PlusIcon}  className="fill-gray-400"/>
        <Icon svg={SpinnerIcon} animate />
        <Icon svg={XIcon} />

      </div>

      <div>
        <Badge variant="secondary">5</Badge>
        <Badge variant="primary">2 de 5</Badge>
      </div>
      <div>
        <Button icon={PlusIcon}> Nova Tarefa</Button>
      </div>
      

      <div className="flex gap-1">
        <ButtonIcon icon={TrashIcon}/>
        <ButtonIcon icon={TrashIcon} variant="secondary"/>
        <ButtonIcon icon={TrashIcon} variant="tertiary"/>
      </div>

    </div>
  )
}