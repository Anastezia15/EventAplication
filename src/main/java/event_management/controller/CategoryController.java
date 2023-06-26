package event_management.controller;

import event_management.model.Category;
import event_management.model.dto.CategoryDto;
import event_management.model.dto.CategoryWithEventsDto;
import event_management.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
//    private static final String GET_CATEGORY_REL = "getEvent-category";
//    private static final String CREATE_CATEGORY_REL = "create-category";
//    private static final String GET_ALL_CATEGORIES_REL = "getEvent-all-categories";
//    private static final String SELF_REL = "self";
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAll();

//        for (Category category : categories) {
//            category.add(
//                    linkTo(methodOn(CategoryController.class).getCategory(category.getId())).withRel(GET_CATEGORY_REL)
//            );
//        }

//        CollectionModel<Category> categoryCollectionModel = CollectionModel.of(categories);
//        categoryCollectionModel.add(
//                linkTo(methodOn(CategoryController.class).getAllCategories()).withRel(SELF_REL),
//                linkTo(methodOn(CategoryController.class).createCategory(new Category())).withRel(CREATE_CATEGORY_REL)
//        );

        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);

//        category.add(
//                linkTo(methodOn(CategoryController.class).getCategory(id)).withRel(SELF_REL),
//                linkTo(methodOn(CategoryController.class).getAllCategories()).withRel(GET_ALL_CATEGORIES_REL),
//                linkTo(methodOn(CategoryController.class).createCategory(category)).withRel(CREATE_CATEGORY_REL)
//        );

        return ResponseEntity.ok(category);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<CategoryWithEventsDto> getCategoryEvents(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean upcoming
    ) {
        Category category = categoryService.getWithEvents(id, page, size, upcoming);

//        category.add(
//                linkTo(methodOn(CategoryController.class).getCategory(id)).withRel(SELF_REL),
//                linkTo(methodOn(CategoryController.class).getAllCategories()).withRel(GET_ALL_CATEGORIES_REL),
//                linkTo(methodOn(CategoryController.class).createCategory(category)).withRel(CREATE_CATEGORY_REL)
//        );

        return ResponseEntity.ok(new CategoryWithEventsDto(category));
    }


    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);

//        createdCategory.add(
//                linkTo(methodOn(CategoryController.class).createCategory(category)).withRel(SELF_REL),
//                linkTo(methodOn(CategoryController.class).getAllCategories()).withRel(GET_ALL_CATEGORIES_REL),
//                linkTo(methodOn(CategoryController.class).getCategory(createdCategory.getId())).withRel(GET_CATEGORY_REL)
//        );
//
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(createdCategory.getId())
//                .toUri();

        return ResponseEntity.created(null).body(createdCategory);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryDto categoryDto) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDto);

//        updatedCategory.add(
//                linkTo(methodOn(CategoryController.class).updateCategory(id, categoryDto)).withRel(SELF_REL),
//                linkTo(methodOn(CategoryController.class).getAllCategories()).withRel(GET_ALL_CATEGORIES_REL),
//                linkTo(methodOn(CategoryController.class).createCategory(updatedCategory)).withRel(CREATE_CATEGORY_REL)
//        );

        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
