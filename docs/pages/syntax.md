::code-group

    ::code-block{preview label="Preview"}
        ::alert
        type: info
        ---
        ### Features
        - Yaml data
        - Markdown support
        ::
    ::

    ```md [Code]
    ::alert
    type: info
    ---
    ### Features
    - Yaml data
    - Markdown support
    ::
    ```

::

---

::code-group

    ::code-block{preview label="Preview"}
        ::alert
        type: info
        ---
        Nested Blocks with data

            ::alert
            type: success
            ---
            Yaay
            ::

        ::
    ::

    ```md [Code]
    ::alert
    type: info
    ---
    Nested Blocks with data

        ::alert
        type: success
        ---
        Yaay
        ::
    ::
    ```

::
