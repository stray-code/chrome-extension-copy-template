import { Button, Flex, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import type { Template } from "./types";

type Props = {
  onAdd: (values: Template) => void;
};

export const AddButton = ({ onAdd }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  return (
    <div>
      <Button onClick={open}>追加</Button>

      <Modal
        opened={opened}
        onClose={close}
        title="定型文を追加"
        centered
        size="lg"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            onAdd({
              ...values,
              id: Date.now(),
            });
            form.reset();

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
            <Flex justify="flex-end" gap="md">
              <Button
                type="button"
                variant="light"
                color="gray"
                onClick={() => close()}
              >
                キャンセル
              </Button>
              <Button type="submit">保存</Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};
