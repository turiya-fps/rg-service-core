# Service: Core Utilities

Common utilities used to improve the developer experience when working with backend services

## Notable Apis

- `/container` providing a simple [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) `Container` with type safety.
- `/logger` providing a simple `Logger` with `LogLevel` support
- `/option` providing a [rust-like](https://doc.rust-lang.org/std/option/enum.Option.html) `Option<T>` to replace `T | undefined`
- `/result` providing a [rust-like](https://doc.rust-lang.org/std/result/enum.Result.html) `Result<T, E>` to replace `throw`
- `/data` provides utilities for working with various data-types.
