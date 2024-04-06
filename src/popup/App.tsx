import { Box, Button, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Template } from "../options/types";

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    chrome.storage.local.get(["TEMPLATES"], (value) => {
      if (!value?.TEMPLATES) {
        return;
      }

      setTemplates(value.TEMPLATES);
    });
  }, []);

  return (
    <Box py="xs" px={5} miw={200} maw={400}>
      {templates.map((template, index) => (
        <Button
          key={index}
          variant="subtle"
          px="xs"
          fullWidth
          color="gray"
          c="dark"
          fw="normal"
          onClick={async () => {
            await navigator.clipboard.writeText(template.body);
            window.close();
          }}
          styles={{
            inner: { display: "block" },
          }}
        >
          {template.title}
        </Button>
      ))}
      <Divider my={5} />
      <Button
        variant="light"
        px="xs"
        fullWidth
        color="gray"
        c="dark"
        fw="normal"
        onClick={() => {
          chrome.runtime.openOptionsPage();
        }}
      >
        設定ページ
      </Button>
    </Box>
  );
}

export default App;
