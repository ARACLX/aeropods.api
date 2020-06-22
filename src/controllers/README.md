# `@aeropods/api/controllers`

Directory which holds `controllers` created with functions that are doing
specified task, the main purpose of controllers is usage in `routers`.

## Controller Template

```ts
import { Request, Response } from 'express'

export class TemplateController {
	constructor() {}
	public templateFunction(req: Request, res: Response) {}
}
```
