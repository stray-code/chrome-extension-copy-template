import { Center, Container, Flex, Paper, Table, Title } from "@mantine/core";
import { IconGridDots } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getLocalStorage, setLocalStorage } from "../utils";
import { AddButton } from "./AddButton";
import { EditButton } from "./EditButton";
import type { Template } from "./types";

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);

  const update = async (newTemplates: Template[]) => {
    setTemplates(newTemplates);

    await setLocalStorage("templateList", newTemplates);
  };

  useEffect(() => {
    (async () => {
      const templateList = await getLocalStorage("templateList");

      if (!templateList) {
        return;
      }

      setTemplates(templateList);
    })();
  }, []);

  return (
    <Container my="xl" size="sm">
      <Flex justify="space-between" align="center">
        <Title order={3}>定型文を設定</Title>
        <AddButton
          onAdd={(values) => {
            const newTemplates = [...templates, values];

            update(newTemplates);
          }}
        />
      </Flex>
      {templates.length > 0 && (
        <Paper mt="xl" shadow="md" withBorder>
          <Table
            highlightOnHover
            highlightOnHoverColor="var(--mantine-color-gray-1)"
          >
            <ReactSortable
              list={templates}
              setList={setTemplates}
              tag={Table.Tbody}
            >
              {templates.map((template) => (
                <Table.Tr key={template.id}>
                  <Table.Td w={0}>
                    <Center>
                      <IconGridDots size={16} color="gray" />
                    </Center>
                  </Table.Td>
                  <Table.Td>{template.title}</Table.Td>
                  <Table.Td w={0}>
                    <EditButton
                      template={template}
                      onSave={(values) => {
                        const newTemplates = templates.map((t) => {
                          return t.id === template.id ? values : t;
                        });

                        update(newTemplates);
                      }}
                      onDelete={() => {
                        const newTemplates = templates.filter(
                          (t) => t.id !== template.id,
                        );

                        update(newTemplates);
                      }}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </ReactSortable>
          </Table>
        </Paper>
      )}
    </Container>
  );
}

export default App;
