import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Template } from "./types";

type Props = {
  template: Template;
  onSave: (values: Template) => void;
  onDelete: () => void;
};

export const EditButton = ({ template, onSave, onDelete }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  return (
    <div>
      <ActionIcon
        variant="light"
        color="gray"
        c="dark"
        onClick={() => {
          form.setValues(template);
          open();
        }}
      >
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title="定型文を編集"
        centered
        size="lg"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);

            close();
          })}
        >
          <Stack>
            <TextInput {...form.getInputProps("title")} label="タイトル" />
            <Textarea
              {...form.getInputProps("body")}
              rows={10}
              label="定型文"
            />
            <Flex justify="space-between">
              <Button
                type="button"
                variant="light"
                color="red"
                onClick={() => onDelete()}
              >
                削除
              </Button>
              <Button type="submit">保存</Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};
